import { ControllerProtocol, HttpResponse } from '@/protocols'
import { Request } from 'express'
import Room from '@models/Room'
import { FindRestaurantById } from '@/helpers'
import { NotFoundError, UnexpectedError } from '@/errors'
import { ErrorHandler } from '@/utils'

export class GetRoomByRestaurantController implements ControllerProtocol {
  async handle(req: Request): Promise<HttpResponse> {
    try {
      const { restaurantId } = req.params

      const restaurant = await FindRestaurantById(restaurantId)

      if (!restaurant) {
        return ErrorHandler(new NotFoundError('Restaurant'))
      }

      const type = 'support_restaurant'

      let room = await Room.findOne({
        members: { $elemMatch: { $eq: restaurant._id } },
        type,
      })

      if (!room) {
        const { currentUser } = req

        const members = [currentUser._id, restaurant._id]
        room = await Room.create({
          members,
          type,
          name: `Support with Restaurant ${restaurant.reference.id}`,
        })
      }

      return {
        status: 200,
        body: room,
      }
    } catch (err) {
      return ErrorHandler(new UnexpectedError(err.message))
    }
  }
}
