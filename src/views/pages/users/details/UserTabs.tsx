'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

interface UserTabsProps {
  tabs: { label: string; content: React.ReactNode }[]
}

export default function UserTabs({ tabs }: UserTabsProps) {
  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = (_: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          {tabs.map((tab, idx) => (
            <Tab key={idx} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, idx) => (
        <div key={idx} role='tabpanel' hidden={tabIndex !== idx}>
          {tabIndex === idx && <Box sx={{ pt: 2 }}>{tab.content}</Box>}
        </div>
      ))}
    </Box>
  )
}
