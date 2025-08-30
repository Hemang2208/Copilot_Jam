"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, User2 } from "lucide-react"

type ProfileCardRoleProps = {
  role: string
  input: string
  avatarUrl?: string
}

type ExistingProps = {
  name: string
  role: string
  description: string
  avatarUrl?: string
}

type ProfileCardProps = ProfileCardRoleProps | ExistingProps

export function ProfileCard(props: ProfileCardProps) {
  const avatarUrl = "avatarUrl" in props ? props.avatarUrl : undefined
  const displayRole = props.role
  const title = "name" in props ? props.name : props.role
  const subtitle = "description" in props ? props.description : props.input

  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <Card className="relative overflow-hidden border-2 border-cyan-400/50 bg-slate-900/70 backdrop-blur-md shadow-lg shadow-cyan-400/20 rounded-lg">
        {/* holographic edge */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-400/10 via-emerald-400/10 to-transparent" />
        <CardContent className="relative p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="size-16 rounded-full bg-gradient-to-br from-cyan-400/40 to-emerald-400/40 p-[2px]">
                <div className="size-full rounded-full bg-background grid place-items-center">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl || "/placeholder.svg?height=64&width=64&query=holographic%20avatar"}
                      alt="Avatar"
                      className="size-14 rounded-full object-cover"
                    />
                  ) : (
                    <User2 className="size-7 text-cyan-300" />
                  )}
                </div>
              </div>
              <Sparkles className="absolute -right-1 -top-1 size-4 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <h3 className="text-balance text-lg md:text-xl font-semibold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                {title}
              </h3>
              <Badge variant="outline" className="border-cyan-400/50 text-cyan-200 bg-cyan-400/10">
                {displayRole}
              </Badge>
            </div>
          </div>

          <p className="mt-4 text-pretty text-sm md:text-base text-foreground/80">{subtitle}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
