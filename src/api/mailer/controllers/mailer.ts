import { Context } from "koa";

type EmailParams = {
  subject: string;
  from: string;
  name: string;
  phone?: string;
  text?: string;
};

export default {
  async sendEmail(ctx: Context) {
    try {
      const { subject, text, name, phone, from } = ctx.request
        .body as EmailParams;

      await strapi.plugins["email"].services.email.send({
        to: process.env.DEFAULT_TO_EMAIL || "",
        subject,
        html: generateEmailTemplate(text, from, name, phone),
      });

      ctx.send({ message: "Email sent successfully" });
    } catch (err: any) {
      ctx.throw(500, err);
    }
  },
};

function generateEmailTemplate(text: string, from: string, name: string, phone?: string): string {
  return `
    <pre style="margin: 0 0 20px 0; padding: 0">${text}</pre>

    <p><span style="font-weight: bold; margin-right: 5px">E-mail:</span>${from}</p>
    <p><span style="font-weight: bold; margin-right: 5px">Imie:</span>${name}</p>
    <p><span style="font-weight: bold; margin-right: 5px">Telefon:</span>${phone || "brak"}</p>
  `;
}
