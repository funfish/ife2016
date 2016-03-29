(function() {
	//行星系统所在的画布初始定义
	var canvas =document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	//命令
	var Mediator = {
		id: 0,
		commond: 'create'
	};
	var preMediator = false;
	var tempMediator = {
		id: 0,
		commond: 'create'
	};	
	//选中的redio
	var radio = {
		output: 0,
		input: 0
	}
	var changeFlag = false;
	var buttonTexts = ['开始飞行','停止飞行','销毁'];
	var buttonNames = ['run', 'stop', 'destory'];
	//定义系统占比
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	if (canvas.width > 800) canvas.width = 800;
	if (canvas.height > 600) canvas.height = 600;
	document.body.appendChild(canvas);

	//each定义函数
	function each(arr, fn) {
		var length = arr.length;
		if (typeof length != 'number')  throw new Error(bject.prototype.toString.call(arr))
		for (var i = 0; i < length; i++)  fn.call(this, arr[i])
	}

	var a


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
						var bus = function(code) {
							if (Math.random() < 0.1){
								bus(code);
							}else {
								setTimeout(function() {				 
									if (preMediator !== code) {
										changeFlag = true;
										preMediator = code;
									}
								}, 0)
							}
						};
						var code = that.adapter(tempMediator);
						bus(code);				
					}
				})(i);
			}
		},
		add: function() {
			var buttons = document.querySelectorAll('button');			
			var li = document.createElement('li');
			var labelCollect = document.querySelector('ul').querySelectorAll('label');
			var liNum = document.querySelector('ul').querySelectorAll('li').length;
			var labelNum = [];
			var label = document.createElement('label');
			var radioCollect = document.querySelectorAll('input');
			var radioNum = 6;
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
				buttons[0].disabled = true;
			} else {
				buttons[0].disabled = false;
			}
			radio = {
				output: 305,
				input: 0.02
			};
			for (var i = 0; i < radioNum; i++) {
				if (i < 3 && radioCollect[i].checked) radio.output = parseInt(radioCollect[i].value);
				if (i >= 3 && radioCollect[i].checked) radio.input = parseFloat(radioCollect[i].value);
			};
			dateCell = {
				id: type,
				input: radio.input,
				output: radio.output
			};
			dateLibrary.push(dateCell);
			this.init();
		},
		destory: function(a) {
			var buttons = document.querySelectorAll('button');
			var parent = buttons[a].parentNode;

			tempMediator.id = parseInt(parent.querySelector('label').innerHTML.match(/\d+/)[0]);
			tempMediator.commond = 'destory';
			document.querySelector('ul').removeChild(parent);
			buttons[0].disabled = false;
			for (var i = 0, m = dateLibrary.length; i < m; i++) {
				if (dateLibrary[i].id === tempMediator.id) {
					dateLibrary.splice(i, 1);
					break;
				}
			}
			this.init();
		},
		run: function(a, action) {
			var buttons = document.querySelectorAll('button');			
			var parent = buttons[a].parentNode;

			tempMediator.id = parseInt(parent.querySelector('label').innerHTML.match(/\d+/)[0]);
			tempMediator.commond = action;		
		},
		adapter: function(o) {
			var code;
			switch (o.commond) {
				case 'create':
					code = (o.id * 8).toString(2);
					break;

				case 'begin':
					code = (o.id * 8 + 1).toString(2);
					break;

				case 'stop':
					code = (o.id * 8 + 2).toString(2);
					break;

				case 'destory':
					code = (o.id * 8 + 3).toString(2);
					break;
				default:; 
			}
			return code
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
			ctx.font = 'bold 14px courier';
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
		sub: function() {
			this.adapter(preMediator);
			if (Mediator.id === this.id) {
				if (Mediator.commond === 'create') this.status = true;
				if (Mediator.commond === 'begin') this.run = true;	
				if (Mediator.commond === 'stop') this.run = false;
				if (Mediator.commond === 'destory') this.status = false;
			}
		},
		adapter: function(code, o) {
			if(typeof code === 'string') {
				var temp = parseInt(code, 2);
				Mediator.id = parseInt(temp / 8);
				Mediator.commond = temp % 8;
				if (Mediator.commond === 0) Mediator.commond = 'create';
				if (Mediator.commond === 1) Mediator.commond = 'begin';
				if (Mediator.commond === 2) Mediator.commond = 'stop';
				if (Mediator.commond === 3) Mediator.commond = 'destory';				
			}
			if (o instanceof Object) {
				var temp = o.id * 65536 + (o.life ? (o.run ? 1 : 2) : 12) * 4096 + o.energy * 4095;
				return temp
			}
		},
		//飞船信号发射器
		transmit: function() {
			var that = this;
			var shipStatus = {
				id: this.id,
				run: this.run,
				life: this.status,
				energy: this.energy
			}
			var sendCode = this.adapter(null, shipStatus);
			return sendCode
		}
	}
	//该型号飞船构造函数
	var SpaceShipF = function() {
		this.id = 1;
		this.speed = 50;
		this.radius = 80;
		this.addEnergy = 0.02;
		this.loseEnergy = 0.05;
	}
	SpaceShipF.prototype = originShip;

	//DCsystem
	var dc = function (code) {
		var translate = {
			id: parseInt(code / 65536),
			run: parseInt((code % 65536) / 4096),
			energy:  (code % 4096) / 4095
		}
		var tempTr = document.createElement('tr');
		var tempTd = [];
		for (var i = 0; i < 5; i++) {
			tempTd[i] = document.createElement('td');
		}

		tempTd[0].innerHTML = translate.id + '号飞船';
		tempTr.appendChild(tempTd[0]);
		for (var i = 0, m = dateLibrary.length; i < m; i++) {
			if (translate.id === dateLibrary[i].id) {
				if (dateLibrary[i].output === 305) {
					tempTd[1].innerHTML = '前进号';
					tempTr.appendChild(tempTd[1]);
				}
				if (dateLibrary[i].output === 507) {
					tempTd[1].innerHTML = '奔腾号';
					tempTr.appendChild(tempTd[1]);
				}
				if (dateLibrary[i].output === 809) {
					tempTd[1].innerHTML = '超越号';
					tempTr.appendChild(tempTd[1]);
				}	
				if (dateLibrary[i].input === 0.02) {
					tempTd[2].innerHTML = '能量型';
					tempTr.appendChild(tempTd[2]);
				}
				if (dateLibrary[i].input === 0.03) {
					tempTd[2].innerHTML = '光能型';
					tempTr.appendChild(tempTd[2]);
				}
				if (dateLibrary[i].input === 0.04) {
					tempTd[2].innerHTML = '永久型';
					tempTr.appendChild(tempTd[2]);
				}
				break;					
			}
		}
		if (translate.run === 12) translate.run = '即将销毁';
		if (translate.run === 2) translate.run = '停止飞行';
		if (translate.run === 1) translate.run = '正在飞行';
		tempTd[3].innerHTML = translate.run;
		tempTr.appendChild(tempTd[3]);
		tempTd[4].innerHTML = parseInt(translate.energy * 100) + '%';
		tempTr.appendChild(tempTd[4]);
		return tempTr
	}
	//运行飞船集合
	var spaceShip = [];
	var spaceShipLength = 0;
	var showTime = 0;
	var dateLibrary = [];
	var dateCell = {};
	var dcsystem = [];

	//更新画布元素位置
	var upgrate = function(period) {
		if (changeFlag) {
			var temp = new SpaceShipF();
			temp.sub();
			if (Mediator.commond === 'create') {
				temp.id = Mediator.id;
				temp.radius = temp.radius + temp.id * 32;
				temp.speed = Math.floor(radio.output / 10);
				temp.loseEnergy = Math.floor(radio.output % 10) * 0.01;
				temp.addEnergy = radio.input;
				spaceShip.push(temp);
				spaceShipLength = spaceShip.length;
			} else {
				spaceShipLength = spaceShip.length;
				if (spaceShipLength > 0) {
					for (var i = 0; i < spaceShipLength; i++) {
						spaceShip[i].sub();
						if (spaceShip[i].status === false) {
							spaceShip.splice(i,1);
							i--;
							spaceShipLength = spaceShip.length;
						}
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
		showTime += period; 
		if (showTime > 1) {
			var table = document.querySelector('table');
			var tr = document.createElement('tr');
			table.innerHTML = '';
			tr.innerHTML = '<th>飞船</th><th>动力系统</th><th>能源系统</th><th>当前飞行状态</th><th>剩余能耗</th>';
			table.appendChild(tr);
			spaceShip.sort(function(a, b) {
				return a.id - b.id
			});
			for (var i = 0; i < spaceShipLength; i++) {
				table.appendChild(dc(spaceShip[i].transmit()))
			}
			showTime = 0;
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
})()