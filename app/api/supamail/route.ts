import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export async function POST(request: NextRequest): Promise<NextResponse<{
  message: string;
}> | NextResponse<{
  error: unknown;
}>> {

  const cookieStore = cookies()
  const supabase = createSupabaseServerSideClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // if no session found, in redirect the user to /login
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 })
  }

  const { email, name, message } = await request.json()

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /*
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MAILER_ID,
      pass: process.env.MAILER_KEY,
    },
  })

  const mailOptions: Mail.Options = {
    from: process.env.MAILER_ID,
    to: process.env.MAILER_ID,
    cc: email,  /** (uncomment this line if you want to send a copy to the sender) */
    subject: `Message from ${name} (${email})`,
    text: message,
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent')
        } else {
          reject(err.message)
        }
      })
    })

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
