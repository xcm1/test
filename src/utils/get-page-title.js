import defaultSettings from '@/settings'

const title = defaultSettings.title || '上海教育督查工作平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
