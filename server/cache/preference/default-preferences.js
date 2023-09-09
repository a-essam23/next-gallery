const defaultAppearancePreference = {
    name: "appearance",
    options: {
        logoSubtitle: "للزخارف المعمارية",
        mainTitle: "مؤسسة القاهرة الخديوية",
        subTitle: "للزخارف المعمارية وتصنيع القوالب",
        theme: "default",
        cover: "/cover2.png",
        exploreSubtitle:
            "In the realm of decor, where artistry and ambiance intertwine, the symphony of design unfolds. Each corner of a space becomes a canvas, waiting for the gentle stroke of a decorator's vision.",
        themes: ["default", "dark"],
        // adLabel:
        //     "نقوم بعمل الزخارف المعمارية وتصنيع القوالب والتصدير الي جميع أنحاء العالم للتواصل عبر الواتس اب 00201120009943",
    },
};

const defaultDetailsPreference = {
    name: "details",
    options: {
        phoneNumbers: ["1234"],
        addresses: [],
        socials: {
            facebook: "",
            whatsapp: "",
            pinterest: "",
        },
        footerSignature:
            "Lorem opsem dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus euismod mauris placerat, eget hendrerit dolor lobortis. Quisque euismod lacus id lectus eleifend, in ultricies lectus interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam ac tortor eget diam pulvinar consectetur.",
    },
};

let defaultPreferences = [
    defaultAppearancePreference,
    defaultDetailsPreference,
];
module.exports = defaultPreferences;
