# quiz-template
Trying out client side quiz

# Adding some HTLM

<div id="target">  place holder </div>

<script>
  def changeTarget(){
    let target = document.findElementById("target")
    target.innerhtml = "new things"
  }
</script>

<button onclick="changeTarget()" >Press Me</button>
