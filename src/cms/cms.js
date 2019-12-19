import CMS from 'netlify-cms-app';
import '../layout/style/style.scss';
import './preview-templates/style.scss';
import PostPreview from './preview-templates/postPreview';

CMS.registerPreviewTemplate('blog', PostPreview);
