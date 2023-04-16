// user name
const userArray = ["mahesh","om","abhishek","rajesh","bassi","ashish","saurabh","aditya","siddhesh","kartik"];


function sendMoney(){

   // Get sender's , receiver's and amount in Send Money
   var senderName = document.getElementById("senderName").value;
   var receiverName = document.getElementById("receiverName").value;
   var amount = parseInt(document.getElementById("amount").value);

   var sender = senderName.charAt(0).toUpperCase() + senderName.slice(1);
   var receiver = receiverName.charAt(0).toUpperCase() + receiverName.slice(1);

   //dialog Box ID's
   var element = document.getElementById("alertMsg");
   const alertBox = document.getElementById('alert');
   alertBox.style.display = 'block';

   //check if all input's are empty
   if(!senderName || !receiverName || !amount){
      element.innerText = `Missing details !`;
   }
   //check if sender and receiver are exists
   else if(!userArray.includes(senderName)){
      element.innerText = `Sender ${senderName} is not present..`;
   }
   else if(!userArray.includes(receiverName)){
      element.innerText = `Receiver ${receiverName} is not present..`;   
   }
   else {
      //get sender and receivers account balance
      var senderUserBankAccount = senderName + "BankBalance";
      var receiverUserBankAccount = receiverName + "BankBalance";

      var senderBankBalance = parseInt(document.getElementById(senderUserBankAccount).innerText);
      var receiverBankBalance = parseInt(document.getElementById(receiverUserBankAccount).innerHTML);


      //check if both sender and receiver are same
      if(senderName === receiverName){
         element.innerText = `Can't send money to same user..!!`;
      }
      //check if amount to be send from sender account is greater than available amount
      else if (amount > senderBankBalance) {
         element.innerText = `Insufficient Balance at sender ${sender}!!`;
      } else {

         //finally, + and - amount from sender and receiver bank balance
         var receiverFinalAmount = receiverBankBalance + amount;

         var senderFinalAmount = senderBankBalance - amount;

         document.getElementById(senderUserBankAccount).innerText = '-' + senderFinalAmount;
         document.getElementById(senderUserBankAccount).style.color = 'red';
         document.getElementById(receiverUserBankAccount).innerHTML = '+' + receiverFinalAmount;
         document.getElementById(receiverUserBankAccount).style.color = 'green';

         // Alert msg
         element.innerHTML = `<strong>Success!</strong> Rs.${amount} is sent to recipient ${receiver} from ${sender} !.`;

         // transaction history 
         var createPTag = document.createElement("li");
         var textNode = document.createTextNode(`Rs.${amount} is sent to recipient ${receiver} from ${sender} on ${Date().split('G')[0]}.`);
         createPTag.appendChild(textNode);
         createPTag.style.color = "#272727";
         var element = document.getElementById("transaction-history-body");
         element.insertBefore(createPTag, element.firstChild);   
      }
   }

   //reset the from after submission
   $('#myForm')[0].reset();
   
   //hide the dialog box after 6s and clear the text inside the
   setTimeout(() => {
      alertBox.style.display = 'none';
      $("#alertMsg").text('');
      document.getElementById(senderUserBankAccount).style.color = '#272727';
      document.getElementById(senderUserBankAccount).innerText = senderFinalAmount;
      document.getElementById(receiverUserBankAccount).style.color = '#272727';
      document.getElementById(receiverUserBankAccount).innerHTML = receiverFinalAmount;
   }, 6000);

}