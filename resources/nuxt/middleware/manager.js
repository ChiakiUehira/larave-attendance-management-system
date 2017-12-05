export default async ({store, redirect, route}) => {
  if (route.fullPath.match('management')) {
    if (!store.state.isManager) {
      redirect('/')
    }
  }
}
