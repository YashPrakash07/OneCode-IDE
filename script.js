var compileBtn= document.getElementById("compileBtn");

var outputText= document.getElementById("output");

compileBtn.onclick= function(event)
{
  runCode();
}

function runCode()
{
  // variables for accessing code editor and language

  var codeEditor= document.getElementById("codeEditor");
  var langId= document.getElementById("langId");




// creating request to send code for compilation

var req= new XMLHttpRequest();
 req.open("post", "https://codequotient.com/api/executeCode");

 const data= { "code": codeEditor.value, langId:langId.value};

 req.setRequestHeader("Content-Type","application/json");
 
 req.send(JSON.stringify(data));
 req.addEventListener("load",function(event)
 {
 
 const response= JSON.parse(event.target.responseText);
 const { error }= response;

 outputText.innerHTML= "Compiling...."

 if(error)
 {
   return outputText.innerHTML="Type code to run....";
 }

  setTimeout(()=> showOutput(response),3000);
 
 });
 }


// function to show Output of program

function showOutput(response) {
  var req = new XMLHttpRequest();
  req.open("get", `https://codequotient.com/api/codeResult/${response.codeId}`);
//  req.setRequestHeader("Access-Control-Allow-Origin"," *")
  req.send();
  req.addEventListener("load", function (event) {
    var output = JSON.parse(event.target.responseText).data;
    output = JSON.parse(output);
    const { errors } = output;
    if (errors) {
      outputText.innerHTML = errors;
      return;
    }
    console.log(output.output);
    outputText.innerHTML = output.output.substr(9).replaceAll("\n","<br/>");
  })
}

