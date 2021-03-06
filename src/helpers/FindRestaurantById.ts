import User, { UserDocument } from '@models/User'
import { ServiceFindUserById } from '@/services/api'
import { EndPoints } from '@config/api'

export async function FindRestaurantById(
  restaurantId: string,
): Promise<UserDocument> {
  let restaurant = await User.findOne({
    reference: { id: restaurantId, type: 'rest' },
  })

  if (!restaurant) {
    const restaurantEndPoints = EndPoints.find(
      endpoint => endpoint.type === 'rest',
    )

    const findEndPoint = restaurantEndPoints.find
    const restaurantData = await ServiceFindUserById(restaurantId, findEndPoint)

    restaurant = await User.create({
      name: restaurantData.name,
      reference: { id: restaurantData.id, type: 'rest' },
      role: 'restaurant',
    })
  }

  return restaurant
}
