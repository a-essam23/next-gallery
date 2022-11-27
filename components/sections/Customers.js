import { v4 } from "uuid";

const Customers = ({ imageList, className }) => {
    return (
        <section
            className={
                "h-96 md:h-112 lg:h-128 xl:h-144 2xl:h-184 flex flex-1" +
                className
            }
            id="customers"
        >
            <div className="w-full h-full flex">
                {imageList.map((image, i) => (
                    <img
                        key={v4()}
                        src={image?.sizes?.original}
                        alt={`roman-classic-customers-${i}`}
                        className="object-cover aspect-3/4"
                    />
                ))}
            </div>
        </section>
    );
};

export default Customers;
