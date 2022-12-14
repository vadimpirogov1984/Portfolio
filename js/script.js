
let menu_btn = document.querySelector(".menu__icon");
let menu_body = document.querySelector(".menu__body");
let menu_body__link = document.querySelector(".header__body-link");

function openBlocks(btn, block, logo) {
    btn.addEventListener("click", function () {

        btn.classList.toggle("active");
        block.classList.toggle("active");
        logo.classList.toggle("active");

    });
}

openBlocks(menu_btn, menu_body, menu_body__link);



//Динамический адаптив=================================================
"use strict";
function DynamicAdapt(type) {
	this.type = type;
}
DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");
	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}
	this.arraySort(this.оbjects);
	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});
	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};
DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		//for (let i = 0; i < оbjects.length; i++) {
		for (let i = оbjects.length - 1; i >= 0; i--) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};
// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}
// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}
// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};
const da = new DynamicAdapt("max");
da.init();

//Скрипт для фоновых изображений=========================
function ibg() {
let ibg = document.querySelectorAll(".ibg");

for (var i = 0; i < ibg.length; i++) {
	if (ibg[i].querySelector("img")) {
	ibg[i].style.backgroundImage =
		"url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
	}
}
}

ibg();

//Слайдер главного экрана=============================================
$(document).ready(function () {
	$(".main-slider__body").slick({
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	arrows: false,
		dots: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		appendDots: $(".main-slider__dotts"),
	  	responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,

		  },
		},
		{
		  breakpoint: 800,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		  },
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
		  },
		},
	  ],
	});
});
//Ввозвращение в начало страницы===========================
const goTopButton = document.querySelector(".go-top");
goTopButton.addEventListener("click", goTop);
window.addEventListener("scroll", trackScroll);

function goTop () {
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -75);
		setTimeout(goTop,0);
	}
}

function trackScroll() {
	const offset = window.pageYOffset;
	const coordinate = document.documentElement.clientHeight;

	if (offset > coordinate) {
		goTopButton.classList.add("go-top--show");
	} else {
		goTopButton.classList.remove("go-top--show");
	}
}



//Отправка формы обратной связи===============================
$(document).ready(function() {
	$("#contacts-page__form").submit(function() {
	  // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
	  if (document.contacts-page__form.contacts-page__name.value == "" || document.contacts-page__form.contacts-page__phone.value == "") {
		valid = false;
		return valid;
	  }
	  $.ajax({
		type: "POST",
		url: "php/mail.php",
		data: $(this).serialize()
	  }).done(function() {
		$(".js-overlay-thank-you").fadeIn();
		$(this)
		  .find("input")
		  .val("");
		$("#contacts-page__form").trigger("reset");
	  });
	  return false;
	});
});
  

//Добваление класса активной ссылки страницы=========================
activeLink();

function activeLink()
{
    const links = document.getElementsByTagName("a");

    for(var i=0;i<links.length;i++)
    {
        if(links[i].href === window.location.href)
        {
            links[i].classList.add('active-link');  
        }
    }  
};