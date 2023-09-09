const Preferences = require("../models/Preferences");
const defaultPreferences = require("../cache/preference/default-preferences");
const { caches } = require("../cache/preference");
const { log } = require("../utils/logger");
const verifyPreferencesExist = async () => {
    //TODO rewrite this to use promise.all instead
    for (let preferenceObject of defaultPreferences) {
        let defaultPreference = preferenceObject.options;
        let preference = await Preferences.findOne({
            name: preferenceObject.name,
        });

        if (!preference) {
            preference = await Preferences.create(preferenceObject);
        } else {
            for (let key of Object.keys(defaultPreference)) {
                // console.log(preference.options[key]);
                if (preference.options[key] == undefined) {
                    log.warning(
                        `${key} not present in ${preferenceObject.name}... appending`,
                        { task: "preferences_init" }
                    );
                    preference.options[key] = defaultPreference[key];
                }
            }
            Preferences.updateOne(
                { name: preferenceObject.name },
                { options: preference.options }
            ).then(() => log.info("Preferences successfully updated"));
        }

        Object.assign(caches[preferenceObject.name], preference.toObject());
    }
};

module.exports = verifyPreferencesExist;
