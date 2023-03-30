/* 
Main Script 

Dont skid pls :(
*/

// This function is skidded lol
function Format(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

function GetData(Token) {
    const request = new Request("https://discordapp.com/api/v6/users/@me", {
        method: "GET",
        headers: {
            "Authorization": Token,
            "Content-Type": "application/json"
        }
    });

    return fetch(request)
        .then(response => {
            if (response.status === 401) {
                return false
            } else {
                return response.json()
            }
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error(`Error occurred: ${error}`))
}

async function CheckToken(Token) {
    let Data = await GetData(Token)
    if (Data) {
        let Username = `${Data.username}#${Data.discriminator}`
        let UserID = Data.id 
        let Email = Data.email 
        let PhoneNumber = Data.phone 
        let MfaEnabled = Data.mfa_enabled

        console.log(`Token Information\n\nToken: ${Token}\n\nUsername: ${Username}\nUser-ID: ${UserID}\nEmail: ${Email}\nPhone Number: ${Format(PhoneNumber)}\n2FA-Enabled: ${MfaEnabled}`)

        alert("Valid token, check console for information")
    } else {
        console.error("Invalid token")
        alert("Invalid token")
    }
}

document.getElementById("submit").addEventListener("click", function() {
    let Token = document.getElementById("token").value

    if (Token != null && Token != "") {
        document.getElementById("token").value = ""

        CheckToken(Token)
    } else {
        alert("Enter a token")
    }
})

console.clear()
