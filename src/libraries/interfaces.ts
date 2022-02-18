import { Document } from 'mongoose';

export default interface IUser extends Document {
    createdBy: any;
    otp: String;
    fName: String;
    lName: String;
    password: String;
    userType: String;
    email: String;
    mobile: Number;
    gender: String;
    dateOfBirth: String;
    profilePic: String;
    parentAgency: String;
    building: String;
    state: String;
    locality: String;
    country: String;
    fcmToken: String;
    updatedBy: any;
    emailVerified: String;
}
export default interface UserRights extends Document {
    id: String;
    icon: String;
    label: String;
    url: String;
    subs: String;
}
export default interface UserRoles extends Document {
    name: String;
    description: String;
    rights: String;
}
export default interface verifyData extends Document {
    email: String;
    mobile: Number;
}
export default interface propertyData extends Document {
    title: String;
    description: String;
    flatNumber: String;
    street: String;
    city: String;
    state: String;
    country: String;
    countryCode: String;
    sellingPrice: [Number];
    discountPrice: [Number];
    deposite: [Number];
    rent: [Number];
    additionalInfo: String;
    propType: String;
    overView: String;
    amenities: String;
    bedRoomTypes: String;
    furnishingTypes: String;
    tags: String;
    gallaryImages: String;
    sliderImages: String;
    propertyPlan: String;
    agency: String;
    agent: String;
    isApproved: Boolean;
    createdBy: any;
    updatedBy: any;
}
export default interface countryData extends Document {
    countryName: String;
    countryCode: String;
}
export default interface propertyTypeData extends Document {
    title: String;
    filter: String;
}
export default interface overViewData extends Document {
    title: String;
    icon: String;
}
export default interface amenitiesData extends Document {
    title: String;
    icon: String;
}
export default interface bedRoomTypeData extends Document {
    title: String;
}
export default interface furnishingTypeData extends Document {
    title: String;
}
export default interface nationalitiesData extends Document {
    title: String;
}
export default interface tagsData extends Document {
    title: String;
    description: String;
}
export default interface additionalInfoData extends Document {
    title: String;
    description: String;
}
export default interface termsAndConditionData extends Document {
    title: String;
    description: String;
}
export default interface agencyData extends Document {
    title: String;
}
export default interface languagesData extends Document {
    country: String;
    language: String;
}
export default interface specialitiesData extends Document {
    title: String;
    icon: String;
}
