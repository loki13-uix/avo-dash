// This file contains the icon registry for the application. And is used to register all the icons in the application.

const iconsRegistry = ['test'] as const

export type IconName = (typeof iconsRegistry)[number]

export default iconsRegistry
