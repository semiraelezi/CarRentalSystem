using System.Net.Mail;
using System.Net;

namespace CarRentalSystem.Services.Implementations
{
    public class SimpleEmailSender
    {
        private readonly string _smtpHost = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUser = "semiraelezzi@gmail.com";      // Your Gmail address
        private readonly string _smtpPass = "krahvekgfykwowny";         // Your Gmail App Password

        public async Task SendEmail(string toEmail, string subject, string body)
        {
            using var client = new SmtpClient(_smtpHost, _smtpPort)
            {
                Credentials = new NetworkCredential(_smtpUser, _smtpPass),
                EnableSsl = true
            };

            var message = new MailMessage(_smtpUser, toEmail, subject, body)
            {
                IsBodyHtml = true
            };

            await client.SendMailAsync(message);
        }
    }
}
