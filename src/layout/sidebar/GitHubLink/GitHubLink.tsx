import React from 'react'
import { GithubOutlined } from '@ant-design/icons'
import { TEXT_KEYS } from 'src/resources/texts'
import { useTranslation } from 'react-i18next'
import './GitHubLink.scss'

export default function GitHubLink() {
  const { t } = useTranslation()

  const data = {
    label: t(TEXT_KEYS.github_link),
    path: 'https://github.com/hasadna/open-bus-map-search',
    icon: <GithubOutlined />,
    element: null,
  }

  const handleClick = () => {
    window.open(data.path, '_blank')
  }

  return (
    <div className="github-link" onClick={handleClick}>
      {data.icon}
    </div>
  )
}
