import CMS from 'netlify-cms-app';
import '../layout/style/style.scss';
import './preview-templates/style.scss';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';
import PostPreview from './preview-templates/postPreview';

CMS.registerMediaLibrary('uploadcare', uploadcare);
CMS.registerMediaLibrary('cloudinary', cloudinary);
CMS.registerPreviewTemplate('blog', PostPreview);
