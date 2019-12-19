import CMS from 'netlify-cms-app';
import '../layout/style/style.scss';
import '../templates/post.scss';
import PostPreview from './preview-templates/postPreview';

CMS.registerPreviewTemplate('blog', PostPreview);
