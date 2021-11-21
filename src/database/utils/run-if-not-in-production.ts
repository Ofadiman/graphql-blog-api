export const runIfNotInProduction = async (callback: () => Promise<void>): Promise<void> => {
  const isProduction: boolean = process.env.NODE_ENV === `production`
  if (isProduction) {
    return
  }

  await callback()
}
