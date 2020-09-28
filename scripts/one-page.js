;(function(){

  let display  = $('.main-content');
  let sections = $('.section');
  let inscroll = false;
  let md = new MobileDetect(window.navigator.userAgent);

  let isMobile = md.mobile();

  let switchActiveClassFixedMenu = menuItemIndex =>{
    $('.fixed-menu__item')
      .eq(menuItemIndex)
      .addClass('fixed-menu__item--active')
      .siblings()
      .removeClass('fixed-menu__item--active');
  };



  let sectionPosition = sectionNum =>{
    if(inscroll === false){
      inscroll = true;
      let position = `${sectionNum * -100}%`;
  
      sections
      .eq(sectionNum)
      .addClass('active')
      .siblings()
      .removeClass('active');
  
  
      display.css({
        transform : `translateY(${position})`
      });

      setTimeout(()=>{
        switchActiveClassFixedMenu(sectionNum);
        inscroll = false
      }, 1300);
  };
};

  let scrollToSection = direction =>{
    let activeSection = sections.filter('.active');
    let nextSection = activeSection.next();
    let prevSection = activeSection.prev();

    if(direction ==='next' && nextSection.length){
      sectionPosition(nextSection.index());
    }

    if(direction ==='prev' && prevSection.length){
      sectionPosition(prevSection.index());
    }

  }


  $('.wrapper').on({
    wheel: e =>{
      let deltaY = e.originalEvent.deltaY;
      let direction = deltaY >0 ? 'next' :'prev';
      if(!$('body').hasClass("locked")){
      scrollToSection(direction);
      }
    },
    touchmove: e=> e.preventDefault()
  });
  
  
  $(document).on('keydown', e=>{
    switch(e.keyCode){
      case 38:
         scrollToSection('prev');    
        break;
     case 40:
         scrollToSection('next');
       break;
    }
 });


 $('[data-scroll-to]').on('click', e=>{
   e.preventDefault();
   let target = $(e.currentTarget).attr('data-scroll-to');
   sectionPosition(target);
 })

if(isMobile){
  $(window).swipe({
    swipe:function(event,direction,distance,duration,fingerCount,fingerData){
      let nextorPrev = direction === 'up' ? 'next' : 'prev';
      if(!$('body').hasClass("locked")){
      scrollToSection(nextorPrev);
      }
    }
  });
}


})()

