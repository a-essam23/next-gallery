import User, { UserRoleNames, userRoles } from "@models/user-model";
import { AppError } from "@utils";
import { catchAsync } from "@utils";
import { log } from "@utils/logger";

const protect = (role: UserRoleNames = "user") =>
    catchAsync(async (req, res, next) => {
        log.info(`Requesting authentication ${req.path}`);
        const session = req.session;
        if (!session?.user?._id) {
            throw AppError.AuthenticationError;
        }
        const user = await User.findById(session?.user?._id);
        if (!user) {
            delete session.user;
            throw AppError.AuthenticationError;
        }
        if (userRoles[user.role] < userRoles[role]) {
            throw AppError.AuthenticationError;
        }
        log.success(`Registered: ${user.username}`, {
            task: "protect_middleware",
            document: user,
        });
        next();
    });

export default protect;
