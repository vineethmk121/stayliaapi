import express from 'express';
import { userRouter } from '../routes/admin/user.route';
import { countryRouter } from '../routes/admin/country.route';
import { overViewRouter } from '../routes/admin/overView.route';
import { propertyTypeRouter } from '../routes/admin/propertyType.route';
import { tagsRouter } from '../routes/admin/tags.route';
import { amenityRouter } from '../routes/admin/amenities.route';
import { furnishingTypeRouter } from '../routes/admin/furnishingType.route';
import { bedRoomTypeRouter } from '../routes/admin/bedRoomType.route';
import { addInfoRouter } from '../routes/admin/additionalInfo.route';
import { propertyRouter } from '../routes/admin/property.route';
import { faqRouter } from '../routes/admin/FAQ.route';
import { chatRouter } from '../routes/admin/chat.route';
import { roleRouter } from '../routes/admin/roles.route';
import { priceRangeRouter } from '../routes/admin/priceRange.route';
import { areaRangeRouter } from '../routes/admin/areaRange.route';
import { furnishingStatusRouter } from '../routes/admin/furnishingStatus.route';
import { landStatusRouter } from '../routes/admin/landStatus.route';
import { contructionStatusRouter } from '../routes/admin/contruction.route';
export const adminRouter = express.Router();

adminRouter.use('/users', userRouter);
adminRouter.use('/role', roleRouter);
adminRouter.use('/country', countryRouter);
adminRouter.use('/overView', overViewRouter);
adminRouter.use('/propertyType', propertyTypeRouter);
adminRouter.use('/tag', tagsRouter);
adminRouter.use('/amenity', amenityRouter);
adminRouter.use('/furnish', furnishingTypeRouter);
adminRouter.use('/bedRoom', bedRoomTypeRouter);
adminRouter.use('/additionalInfo', addInfoRouter);
adminRouter.use('/property', propertyRouter);
adminRouter.use('/faq', faqRouter);
adminRouter.use('/chat', chatRouter);
adminRouter.use('/priceRange', priceRangeRouter);
adminRouter.use('/areaRange', areaRangeRouter);
adminRouter.use('/furnishingStatus', furnishingStatusRouter);
adminRouter.use('/landStatus', landStatusRouter);
adminRouter.use('/contructionStatus', contructionStatusRouter);
