import store from '@/store'

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogged = store.getters.isLogged
    console.log('hey');
    if(to.name === 'Homepage'){
      if (isLogged) {
        next({name: 'Available'})
      } else {
        next({ name: 'Account' })
      }
    }else{
      if (isLogged) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
   
  } else {
    next()
  }
}
