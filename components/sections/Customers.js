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
            {imageList.map((image, i) => (
                <div className="w-full h-full" key={v4()}>
                    <img
                        src={image?.sizes?.original}
                        alt={`roman-classic-customers-${i}`}
                        className="object-cover w-full h-full"
                    />
                </div>
            ))}
        </section>
    );
};

export default Customers;
