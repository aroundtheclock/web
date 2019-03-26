import interact from "interactjs";

export default {
    bind(el, binding, vnode) {
        el.style.width =  binding.width;
        interact(el)
            .draggable({
                inertia: true,
                restrict: {
                    restriction: "parent",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },

                lockAxis: 'x',
                autoScroll: true,
                snap: {
                    targets: [
                        interact.createSnapGrid({ x: binding.width, y: 30 })
                    ],
                    range: Infinity,
                    relativePoints: [ { x: 0, y: 0 } ]
                },
                onmove(event){
                    let target = event.target,
                        x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
                        y = 0;

                   // console.log(x);

                    // translate the element
                    target.style.webkitTransform = target.style.transform =
                        "translate(" + x + "px, 0)";

                    // update the posiion attributes
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);
                }
            });
    }
};
