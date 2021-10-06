import defaultSettings from '@/settings'

const title = defaultSettings.title || 'BackStageManagement'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
