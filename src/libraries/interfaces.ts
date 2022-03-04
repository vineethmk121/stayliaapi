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
    country: any;
    fcmToken: String;
    updatedBy: any;
    emailVerified: String;
    socialType: String;
    socialToken: String;
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
    rights: any;
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
    country: any;
    countryCode: String;
    sellingPrice: [Number];
    discountPrice: [Number];
    deposite: [Number];
    rent: [Number];
    additionalInfo: any;
    propertyType: String;
    overView: [any];
    amenities: [any];
    bedRoomTypes: [any];
    furnishingTypes: [any];
    tags: [any];
    gallaryImages: String;
    sliderImages: String;
    propertyPlan: String;
    agency: any;
    agent: any;
    isApproved: Boolean;
    createdBy: any;
    updatedBy: any;
}
export default interface mobilePropertyData extends Document {
    title: String;
    description: String;
    flatNumber: String;
    street: String;
    city: String;
    state: String;
    country: any;
    countryCode: String;
    sellingPrice: [Number];
    discountPrice: [Number];
    deposite: [Number];
    rent: [Number];
    additionalInfo: any;
    propertyType: String;
    overView: [any];
    amenities: [any];
    bedRoomTypes: [any];
    furnishingTypes: [any];
    tags: [any];
    gallaryImages: String;
    sliderImages: String;
    propertyPlan: String;
    agency: any;
    agent: any;
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
    overViewIcon: String;
}
export default interface specialitiesData extends Document {
    title: String;
    specialtyIcon: String;
}
export default interface amenitiesData extends Document {
    title: String;
    amenitiesIcon: String;
}
export default interface bedRoomTypeData extends Document {
    title: String;
}
export default interface furnishingTypeData extends Document {
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
export default interface faqData extends Document {
    title: String;
    description: String;
}
export default interface conversaionData extends Document {
    lastMessage: String;
    loginId: any;
    receiverId: any;
    message: any;
}
export default interface chatData extends Document {
    message: any;
    repliedTo: any;
    senderId: any;
    receiverId: any;
    conversationId: any;
}
export default interface savePropertyData extends Document {
    userId: any;
    propertyId: any;
}
export default interface saveAgentData extends Document {
    userId: any;
    AgentId: any;
}
