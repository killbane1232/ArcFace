import createApiInstance from '@/api/createApiInstance'

const API_URL = import.meta.env.VITE_API_USERS_URL

const userServiceInstance = createApiInstance(API_URL)

class _UserService {
  async register (body) {
    const response = await userServiceInstance.post('/register', body)

    return response.data
  }

  async login (body) {
    const response = await userServiceInstance.post('/login', body)

    return response.data
  }

  async update (payload) {
    const form = new FormData()

    form.append('username', payload.username)
    form.append('firstName', payload.firstName)
    form.append('lastName', payload.lastName)
    form.append('bio', payload.bio)
    form.append('roles', payload.roles[0])
    if (payload.avatar) {
      form.append('avatar', payload.avatar)
    }

    const response = await userServiceInstance.post('/update', form)

    return response.data
  }

  async getUserById (id) {
    const response = await userServiceInstance.get(`?id=${id}`)

    return response.data
  }
}

const UserService = new _UserService()

export default UserService
