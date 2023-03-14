"use client";
import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle({ name }) {

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    console.log(name)
  }, [enabled, name])

  return (
    <Switch
      onClick={() => console.log('test')}
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-orange-600' : 'bg-orange-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-black transition`}
      />
    </Switch>
  )
}