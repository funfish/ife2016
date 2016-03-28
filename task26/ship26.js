window.onload =function() {
	//行星系统所在的画布初始定义
	var canvas =document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	//命令
	var Mediator = {
		id: 0,
		commond: 'create'
	};
	var preMediator = {
		id: 0,
		commond: 'create'
	};
	var tempMediator = {
		id: 0,
		commond: 'create'
	};	var changeFlag = false;
	var buttonTexts = ['开始飞行','停止飞行','销毁'];
	var buttonNames = ['run', 'stop', 'destory'];
	//定义系统占比
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	if (canvas.width > 800) canvas.width = 600;
	if (canvas.height > 500) canvas.height = 500;
	document.body.appendChild(canvas);

	//each定义函数
	function each(arr, fn) {
		var length = arr.length;
		if (typeof length != 'number')  throw new Error(bject.prototype.toString.call(arr))
		for (var i = 0; i < length; i++)  fn.call(this, arr[i])
	}

	//pannel 控制
	var commonder = function() {}
	commonder.prototype = {
		init: function() {
			var buttons = document.querySelectorAll('button');
			var that = this;
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].onclick = (function(a) {
					return function() {
						switch (buttons[a].name) {
							case 'add':
								that.add();
								break;

							case 'destory':
								that.destory(a);
								break;

							case 'run':
								that.run(a,'begin');
								break;

							case 'stop':
								that.run(a, 'stop');
								break;

							default: alert('wrong');

						}
						var t = Math.random();
						setTimeout(function() {
							if (t > 0.3) {
								Mediator.id = tempMediator.id;
								Mediator.commond = tempMediator.commond;
							}
							if (preMediator.id !== Mediator.id || preMediator.commond !== Mediator.commond) {
								changeFlag = true;
								preMediator.id = Mediator.id;
								preMediator.commond = Mediator.commond;
							}	
						}, 1000)					
					}
				})(i);
			}
		},
		add: function() {
			var buttons = document.querySelectorAll('button');			
			var li = document.createElement('li');
			var labelCollect = document.querySelectorAll('label');
			var liNum = document.querySelectorAll('li').length;
			var labelNum = [];
			var label = document.createElement('label');
			var newButtons = [];
			var type = 0;
			var diff = false;
			var tempArr = [];

			if (buttons.length === 1) {
				type = 1;
			} else {
				for (var j = 0, m = labelCollect.length; j < m; j++) labelNum.push(parseInt(labelCollect[j].innerHTML.match(/\d+/)[0]));
				while(!diff) {
					diff = true;
					type++;
					for (var j = 0, m = labelNum.length; j < m; j++) {
						if (type === labelNum[j]) {
							diff = false;
							break;
						}
					}
				} 
			}
			newButtons.length = 3;
			label.innerHTML = '请对'+ type +'号飞船下达指令';
			li.appendChild(label);
			var j = 0;
			each(newButtons, function(item) {
				item = document.createElement('button');
				item.name = buttonNames[j];
				item.innerHTML = buttonTexts[j];
				li.appendChild(item);
				j++;
			})
			if (liNum === 0) {
				document.querySelector('ul').appendChild(li);
			} else{
				for (var j = 0; j < liNum; j++) {
					if (type < parseInt(labelCollect[j].innerHTML.match(/\d+/)[0])) {
						document.querySelector('ul').insertBefore(li, labelCollect[j].parentNode);
						break;
					}else {
						if (j === liNum -1) document.querySelector('ul').appendChild(li);
					}
				}				
			}

			
			tempMediator.id = type;
			tempMediator.commond = 'create'; 
			if (labelCollect.length >= 3) {
				buttons[buttons.length - 1].disabled = true;
			} else {
				buttons[buttons.length - 1].disabled = false;
			}
			this.init();
		},
		destory: function(a) {
			var buttons = document.querySelectorAll('button');
			var parent = buttons[a].parentNode;

			tempMediator.id = parseInt(parent.querySelector('label').innerHTML.match(/\d+/)[0]);
			tempMediator.commond = 'destory';
			document.querySelector('ul').removeChild(parent);
			buttons[buttons.length-1].disabled = false;
			this.init();
		},
		run: function(a, action) {
			var buttons = document.querySelectorAll('button');			
			var parent = buttons[a].parentNode;

			tempMediator.id = parseInt(parent.querySelector('label').innerHTML.match(/\d+/)[0]);
			tempMediator.commond = action;		
		}
	}
	var commonder = new commonder();
	commonder.init();
	//飞船的初始对象
	var originShip = {
		status: true,
		energy: 0.8,
		t: 0,
		run: false,
		draw: function(period) {
			var energyWidth = 70*this.energy;
			if (this.run) this.t += period;
			ctx.save();
			ctx.translate(canvas.width/2, canvas.height/2);
			ctx.rotate(this.speed * this.t / this.radius);
			ctx.translate(0, -this.radius);
			ctx.fillStyle = 'yellow';
			if (this.energy !== 0) ctx.fillRect(-35, -10, 70, 20);
			ctx.fillStyle = 'red';
			if (this.energy !== 1) ctx.fillRect(-35 + energyWidth, -10, 70 - energyWidth , 20);
			ctx.fillStyle = 'black';
			//ctx.font='bold 12px courier';
			ctx.font='bold 14px courier';
			ctx.textAlign = 'center';
			ctx.fillText(this.id + '号-' + Math.floor(this.energy*100) + '%', 0, 5)
			ctx.restore();
		},
		runUpdate: function(period) {
			if (this.run) {
				this.energy += (this.addEnergy - this.loseEnergy) * period;
			}else {
				this.energy += this.addEnergy * period;
			};
			if (this.energy <= 0) this.run = false;
			if (this.energy >= 1) this.energy = 1;					
		},
		//飞船接受信息函数
		sub: function(order) {
			if (order.id === this.id) {
				if (order.commond === 'create') this.status = true;
				if (order.commond === 'begin') this.run = true;	
				if (order.commond === 'stop') this.run = false;
				if (order.commond === 'destory') this.status = false;
			}
		},
	}
	//该型号飞船构造函数
	var SpaceShipF = function() {
		this.id = 1;
		this.speed = 150;
		this.radius = 80;
		this.addEnergy = 0.02;
		this.loseEnergy = 0.05;
	}
	SpaceShipF.prototype = originShip;
	//运行飞船集合
	var spaceShip = [];
	var spaceShipLength = 0;

	//更新画布元素位置
	var upgrate = function(period) {
		if (changeFlag) {
			if (Mediator.commond === 'create') {
				var temp = new SpaceShipF();
				temp.id = Mediator.id;
				temp.radius = temp.radius + temp.id * 32;
				spaceShip.push(temp);
			}
			spaceShipLength = spaceShip.length;
			if (spaceShipLength > 0) {
				for (var i = 0; i < spaceShipLength; i++) {
					spaceShip[i].sub(Mediator);
					if (spaceShip[i].status === false) {
						spaceShip.splice(i,1);
						i--;
						spaceShipLength = spaceShip.length;
					}
				}
			}
			changeFlag = false;
		}
		//更新第一类船状态
		for (var i = 0; i < spaceShipLength; i++) spaceShip[i].runUpdate(period);
		//碰撞检查
		for (var i = 0; i < spaceShipLength; i++) {
			for (var j = i + 1; j < spaceShipLength; j++) {
				if (spaceShip[i].id === spaceShip[j].id) {
					var iRotate = spaceShip[i].speed * spaceShip[i].t / spaceShip[i].radius % (2 * Math.PI);
					var jRotate = spaceShip[j].speed * spaceShip[j].t / spaceShip[j].radius % (2 * Math.PI);
					var rate = 75/(spaceShip[i].radius + 30 * spaceShip[i].id);
					if ((iRotate - jRotate <= rate && jRotate - iRotate <= rate) 
						|| iRotate - jRotate >= 2 * Math.PI - rate) {
						spaceShip.splice(i,1);
						spaceShip.splice(j - 1, 1);
						spaceShipLength -= 2;
						i--;
						alert('Your poor job, ship ' + (i + 1) + ' and ship ' + (j + 1) + ' collision!');
					}
				}
			}
		}
	}

	//更新渲染
	var render = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		//绘制太阳
		ctx.fillStyle = 'blue';
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, 80, 0, 2*Math.PI);
		ctx.fill();
		//绘制太空船
		for (var i = 0; i < spaceShipLength; i++) spaceShip[i].draw((new Date() - then)/1000);
	}

 	var w = window;
  	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var main = function() {
		var now = new Date();
		var period = (now - then)/1000;
		upgrate(period);
		render();
		now = new Date();
		then = now;
		requestAnimationFrame(main);
	}

  	var then = new Date();
  	main();	
}