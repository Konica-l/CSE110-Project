import { type ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '../pages/auth.server.ts'

export const action = ({ request }: ActionFunctionArgs) => {
    return authenticator.authenticate('google', request);

}