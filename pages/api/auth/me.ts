import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { UserResponse } from '@/types/user.type'

export default function handler(req: NextApiRequest, res: NextApiResponse<UserResponse>) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado' })
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret') as {
            id: number
            name: string
            email: string
            role: string
        }
        return res.status(200).json({ data: decoded })
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' })
    }
}