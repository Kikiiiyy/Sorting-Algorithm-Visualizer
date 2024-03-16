let tab=[];

function createArray(){
	for(let i=0;i<100;i++){
		tab[i]=Math.floor(Math.random()*100);
	}
}

function showArray(){
	let container=document.getElementById("arrayContainer");
	for(let i=0;i<tab.length;i++){
		let block=document.createElement("div");
		block.classList.add("arrayBlock");
		block.dataset.value=tab[i].toString();
		block.addEventListener("mouseover", mouseOver);
		block.addEventListener("mouseout", mouseOut);
		block.style.height=tab[i]*8+"px";
		container.appendChild(block);
		/*
		let element=document.createElement("h1");
		element.innerText=tab[i].toString();
		block.appendChild(element);
		*/
	}
}

function mouseOver(){
	this.style.backgroundColor="red";
	document.getElementById("selector").innerText=this.dataset.value;
}

function mouseOut(){
	this.style.backgroundColor="cyan";
	document.getElementById("selector").innerText="";
}

function deleteArray(){
	document.getElementById("arrayContainer").innerHTML="";
}

function sortArray(){
	tab.sort(function(a,b){return a > b ? 1 : -1});
	deleteArray();
	showArray();
}

function generateArray(){
	if(document.getElementById("arrayContainer").innerHTML!=""){
		deleteArray();
	}
	createArray();
	showArray();
}
