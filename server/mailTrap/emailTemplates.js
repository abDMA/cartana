export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>التحقق من البريد الإلكتروني الخاص بك</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">التحقق من البريد الإلكتروني الخاص بك</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>شكرا لك على التسجيل! رمز التحقق الخاص بك هو:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>أدخل هذا الرمز في صفحة التحقق لإكمال تسجيلك.</p>
    <p>ستنتهي صلاحية هذا الرمز خلال 15 دقيقة لأسباب أمنية.</p>
    <p>إذا لم تقم بإنشاء حساب معنا، يرجى تجاهل هذا البريد الإلكتروني.</p>
    <p>أطيب التحيات،<br>Marveleza</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>هذه رسالة تلقائية، يرجى عدم الرد على هذا البريد الإلكتروني.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تمت إعادة تعيين كلمة المرور بنجاح</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">تمت إعادة تعيين كلمة المرور بنجاح</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>مرحبًا،</p>
    <p>نكتب إليك لتأكيد أنه تمت إعادة تعيين كلمة المرور الخاصة بك بنجاح.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>إذا لم تقم ببدء إعادة تعيين كلمة المرور هذه، فيرجى الاتصال بفريق الدعم لدينا على الفور.</p>
    <p>لأسباب أمنية، ننصحك بما يلي:</p>
    <ul>
     <li>استخدم كلمة مرور قوية وفريدة من نوعها</li>
      <li>تمكين المصادقة الثنائية إذا كانت متوفرة</li>
      <li>تجنب استخدام نفس كلمة المرور عبر مواقع متعددة</li>
    </ul>
    <p>نشكرك على مساعدتنا في الحفاظ على أمان حسابك.</p>
    <p>مع أطيب التحيات،<br>فريق التطبيقات لديك</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>هذه رسالة تلقائية، يرجى عدم الرد على هذا البريد الإلكتروني.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إعادة تعيين كلمة المرور الخاصة بك</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">إعادة تعيين كلمة المرور</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>مرحبًا،</p>
    <p>لقد تلقينا طلبًا لإعادة تعيين كلمة المرور الخاصة بك. إذا لم تكن قد قدمت هذا الطلب، يرجى تجاهل هذه الرسالة الإلكترونية.</p>
    <p>لإعادة تعيين كلمة المرور الخاصة بك، انقر فوق الزر أدناه:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">إعادة تعيين كلمة المرور</a>
    </div>
    <p>ستنتهي صلاحية هذا الرابط خلال ساعة واحدة لأسباب أمنية.</p>
    <p>مع أطيب التحيات،<br>Marveleza</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>هذه رسالة تلقائية، يرجى عدم الرد على هذا البريد الإلكتروني.</p>
  </div>
</body>
</html>
`;
export const sendCardsTemail = (cards) => { return ` <!DOCTYPE html> <html lang="ar"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>تفاصيل مشترياتك</title> </head> <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;"> <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;"> <h1 style="color: white; margin: 0;">شكراً لتسوقك معنا!</h1> </div> <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"> <p>مرحباً،</p> <p>شكراً لك على عملية الشراء! فيما يلي تفاصيل البطاقات التي قمت بشرائها:</p> <div style="margin-top: 20px;"> ${cards .map((card) => ` <div style="border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 15px;"> <h2 style="margin: 0 0 10px;">${card.Name}</h2> <div style="text-align: center; margin-bottom: 15px;"> <img src="${card.img}" alt="${card.Name}" style="max-width: 100%; border-radius: 5px;"> </div> <p style="font-size: 18px; margin: 0;">serial : <strong>${card.serial}</strong></p> 
  </div> ` ).join('')} </div> <p>نأمل أن تستمتع باستخدام بطاقاتك. إذا كانت لديك أي أسئلة، لا تتردد في التواصل معنا.</p> <p>أطيب التحيات،<br>فريق Marveleza</p> </div> <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;"> <p>هذه رسالة تلقائية، يرجى عدم الرد على هذا البريد الإلكتروني.</p> </div> </body> </html> `; };