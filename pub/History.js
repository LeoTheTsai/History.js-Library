function History(start, end, width, height, selector, direction, side){
    this.starDate = start
    this.endDate = end
    this.width = width
    this.height = height
    this.numEvent = 0
    //error checking direction
    if(direction !== 'horizontal' && direction !== 'vertical'){
        throw new Error('Invalid direction')
    }
    this.direction = direction
    //error checking direction with side
    if(this.direction == 'horizontal'){
        if(side !== 'up' && side !== 'down' && side !== 'both'){
            throw new Error('Invalid side with direction')
        }
    }else{
        if (side !== 'left' && side !== 'right' && side !== 'both'){
            throw new Error('Invalid side with direction')
        }
    }
    this.side = side
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //give random id to svg so we can place 2 same svg in a div without complication
    this.svg.setAttribute('class', `id${Math.floor(Math.random() * 1000000)}svg`)
    this.svg.setAttribute('direction',this.direction)
    this.svg.setAttribute('side', this.side)
    this.selector = document.querySelector(selector)

    this.createNonAnimatedClickHistory = function (includeYear, events, barLength){
        this.createHistoryLine(includeYear)
        this.addBarEvents(events, false, barLength, true)
    }

    this.createNonAnimatedNonClickHistory = function (includeYear, events, barLength){
        this.createHistoryLine(includeYear)
        this.addBarEvents(events, false, barLength, false)
    }

    this.createAnimatedClickHistory = function (includeYear, events, barLength){
        this.createHistoryLine(includeYear)
        this.addBarEvents(events, true, barLength, true)
    }

    this.createAnimatedNonClickHistory = function (includeYear, events, barLength){
        this.createHistoryLine(includeYear)
        this.addBarEvents(events, true, barLength, false)
    }

    this.createScroll = function(numSteps, idList){
        this.createHistoryLine(false)
        this.scroll(numSteps, idList)
    }

    this.createStep = function(numSteps, htmlList){
        this.createHistoryLine(false)
        this.addStepEvents(numSteps, htmlList)
    }

    this.createHistoryLine = function (includeYear){
        //define position of the Bar, define different in vertical and horizontal
        let startBarPlace;
        
        this.svg.setAttribute("width", this.width)
        this.svg.setAttribute("height", this.height)
        const line = document.createElementNS("http://www.w3.org/2000/svg",'line')
        //line.className = 'historyLine'
        const startCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
        const endCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
        const startYearText =document.createElementNS("http://www.w3.org/2000/svg",'text')
        const endYearText = document.createElementNS("http://www.w3.org/2000/svg",'text')

        if (this.direction == 'vertical'){
            let yearTextXCoord;
            if(this.side == 'left'){
                startBarPlace = 60
                yearTextXCoord = startBarPlace - 50
            }else if(this.side == 'right'){
                startBarPlace = this.width - 60
                yearTextXCoord = startBarPlace + 10
            }else{
                startBarPlace = this.width / 2
                yearTextXCoord = startBarPlace - 50
            }

            line.setAttribute("x1", startBarPlace)
            line.setAttribute("x2", startBarPlace)
            line.setAttribute("y1", "10")
            line.setAttribute("y2", this.height - 10)
            line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2")

            startCircle.setAttribute( "cx", startBarPlace)
            startCircle.setAttribute("cy", "10")
            startCircle.setAttribute( "r", "5")
            startCircle.setAttribute("style", "fill:black;")

            endCircle.setAttribute("cx", startBarPlace)
            endCircle.setAttribute("cy", this.height - 10)
            endCircle.setAttribute( "r", "5")
            endCircle.setAttribute("style", "fill:black;")

            //record here, can be used in other function to calc the distance between each point
            this.startCicleCoord = 10
            this.endCircleCoord = this.height - 10

            startYearText.setAttribute("x",yearTextXCoord)
            startYearText.setAttribute("y", "15")
            startYearText.textContent = this.starDate

            endYearText.setAttribute("x", yearTextXCoord)
            endYearText.setAttribute("y", this.height - 5)
            endYearText.textContent = this.endDate

        }else{
            let yearTextYCoord;
            if(this.side == 'up'){
                startBarPlace = 40
                yearTextYCoord = startBarPlace - 10
            }else if(this.side == 'down'){
                startBarPlace = this.height - 60
                yearTextYCoord = startBarPlace + 20
            }else{
                startBarPlace = this.height / 2
                yearTextYCoord = startBarPlace +20
            }

            line.setAttribute("x1", "10")
            line.setAttribute("x2", this.width - 10)
            line.setAttribute("y1", startBarPlace)
            line.setAttribute("y2", startBarPlace)
            line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2")

            startCircle.setAttribute( "cx", "10")
            startCircle.setAttribute("cy", startBarPlace)
            startCircle.setAttribute( "r", "5")
            startCircle.setAttribute("style", "fill:black;")

            endCircle.setAttribute("cx", this.width - 10)
            endCircle.setAttribute("cy", startBarPlace)
            endCircle.setAttribute( "r", "5")
            endCircle.setAttribute("style", "fill:black;")

            //record here, can be used in other function to calc the distance between each point
            this.startCicleCoord = 10
            this.endCircleCoord = this.width - 10

            startYearText.setAttribute("x","0")
            startYearText.setAttribute("y", yearTextYCoord)
            startYearText.textContent = this.starDate

            endYearText.setAttribute("x", this.width - 40)
            endYearText.setAttribute("y", yearTextYCoord)
            endYearText.textContent = this.endDate

        }
        

        this.svg.appendChild(line)
        this.svg.appendChild(startCircle)
        this.svg.appendChild(endCircle)
        if(includeYear){
            this.svg.appendChild(startYearText)
            this.svg.appendChild(endYearText)
        }
        this.selector.appendChild(this.svg)
    }


    this.addBarEvents = function (events, isAnimated, barLength, onClickToShow){
        this.numEvent = events.length
        events.forEach((event,index) => {
            const eventBar = document.createElementNS("http://www.w3.org/2000/svg",'line')
            const eventCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
            const eventName = document.createElementNS("http://www.w3.org/2000/svg",'text')
            let barStart;
            let barEnd
            if(this.direction == "vertical"){
                const YCoordLength = (this.endCircleCoord - this.startCicleCoord) / (this.numEvent + 1)
                let eventNameXCoord;
                //choose which side to present and the length
                if(this.side == 'left'){
                    barStart = 60
                    barEnd = 60 + barLength
                    eventNameXCoord =  60 + barLength - event.year.length * 8
                }else if(this.side == 'right'){
                    barStart = this.width - 60
                    barEnd = this.width - 60 -  barLength
                    eventNameXCoord =  this.width - 60 - barLength
                }else{
                    if((index + 1) % 2 == 1){
                        barStart = this.width / 2
                        barEnd = this.width / 2 + barLength
                        eventNameXCoord =  this.width / 2 + barLength - event.year.length * 8
                    }else{
                        barStart = this.width / 2
                        barEnd = this.width / 2 -  barLength
                        eventNameXCoord =  this.width / 2 - barLength
                    }
                }
                
                //eventBar
                eventBar.setAttribute("x1", barStart)
                eventBar.setAttribute("x2", barEnd)
                eventBar.setAttribute("y1", YCoordLength * (index + 1))
                eventBar.setAttribute("y2", YCoordLength * (index + 1))

                //eventCircle
                eventCircle.setAttribute("cx", barStart)
                eventCircle.setAttribute("cy", YCoordLength * (index + 1))
                eventCircle.setAttribute("r", 5)
                eventCircle.setAttribute("style","fill:white;stroke:black; stroke-width:2px")

                //eventText
                eventName.setAttribute("x",eventNameXCoord)
                eventName.setAttribute("id", `${(index + 1)}event`)
                eventName.setAttribute("y", YCoordLength * (index + 1) + 20)
                if (onClickToShow){
                    eventName.addEventListener('click', function(e){
                        _addPopUp(
                            e.target.parentNode,
                            e.target.previousSibling,
                            e.target,
                            event.name, 
                            event.description, 
                            eventName.id
                        )
                    })
                }else{
                    _addPopUp(
                        this.svg,
                        eventBar,
                        eventName,
                        event.name, 
                        event.description, 
                        eventName.id
                    )
                }
                
                eventName.textContent = event.year
            }else{
                const XCoordLength = (this.endCircleCoord - this.startCicleCoord) / (this.numEvent + 1)
                let eventNameYCoord;
                //choose which side to present and the length
                if(this.side == 'up'){
                    barStart = 40
                    barEnd = 40 + barLength
                    eventNameYCoord = 40 + barLength - 5
                }else if(this.side == 'down'){
                    barStart = this.height - 60
                    barEnd = this.height - 60 -  barLength
                    eventNameYCoord =  this.height - 60 - barLength + 10
                }else{
                    if((index + 1) % 2 == 1){
                        barStart = this.height / 2
                        barEnd = this.height / 2 + barLength
                        eventNameYCoord =  this.height / 2 + barLength - 5
                    }else{
                        barStart = this.height / 2
                        barEnd = this.height / 2 -  barLength
                        eventNameYCoord =  this.height / 2 - barLength + 10
                    }
                }

                //eventBar
                eventBar.setAttribute("x1", XCoordLength * (index + 1))
                eventBar.setAttribute("x2", XCoordLength * (index + 1))
                eventBar.setAttribute("y1", barStart)
                eventBar.setAttribute("y2", barEnd)

                //eventCircle
                eventCircle.setAttribute("cx", XCoordLength * (index + 1))
                eventCircle.setAttribute("cy", barStart)
                eventCircle.setAttribute("r", 5)
                eventCircle.setAttribute("style","fill:white;stroke:black; stroke-width:2px")

                //eventText
                eventName.setAttribute("x",XCoordLength * (index + 1) + 10)
                eventName.setAttribute("id", `${(index + 1)}event`)
                eventName.setAttribute("y", eventNameYCoord)
                if (onClickToShow){
                    eventName.addEventListener('click', function(e){
                        _addPopUp(
                            e.target.parentNode,
                            e.target.previousSibling,
                            e.target,
                            event.name, 
                            event.description, 
                            eventName.id
                        )
                    })
                }else{
                    _addPopUp(
                        this.svg,
                        eventBar,
                        eventName,
                        event.name, 
                        event.description, 
                        eventName.id
                    )
                }
                eventName.textContent = event.year
            }

            //choosing whether the bar is animated
            if(isAnimated && onClickToShow){
                eventBar.setAttribute("class","animatedLine")
                eventBar.setAttribute("style", 
                `stroke:rgb(0,0,0);stroke-width:2; stroke-dasharray: ${barLength};stroke-dashoffset: ${barLength};`)
            
                eventName.setAttribute("class", "animatedOnClickEventName")
            }else if (!isAnimated && onClickToShow){
                eventBar.setAttribute("class","Line")
                eventBar.setAttribute("style", 
                "stroke:rgb(0,0,0);stroke-width:2;")

                eventName.setAttribute("class", "notAnimatedOnClickEventName")
            }else if (isAnimated && !onClickToShow){
                eventBar.setAttribute("class","animatedLine")
                eventBar.setAttribute("style", 
                `stroke:rgb(0,0,0);stroke-width:2; stroke-dasharray: ${barLength};stroke-dashoffset: ${barLength};`)
            
                eventName.setAttribute("class", "animatedNotOnClickEventName")
            }else{
                eventBar.setAttribute("class","Line")
                eventBar.setAttribute("style", 
                "stroke:rgb(0,0,0);stroke-width:2;")

                eventName.setAttribute("class", "notAnimatedNotOnClickEventName")
            }

            this.svg.appendChild(eventBar)
            this.svg.appendChild(eventName)
            this.svg.appendChild(eventCircle)
        })
        

    }

    const _addPopUp = function (svg, bar, year, name, text, id){
        const svgClassName = svg.getAttribute('class')
        const uid = svgClassName.slice(0,-3)
        //search by uid and id so we can identified the pop up is in which svg
        const exist = document.getElementById(`${uid}${id}Description`)
        if (exist !== null){
            exist.remove()
            return
        }
        let x,y,vhLength
        let xCoord, width, yCoord, height;
        if (svg.getAttribute('direction') == 'vertical'){
            x = parseInt(bar.getAttribute('x2'))
            y = parseInt(bar.getAttribute('y2'))
            vhLength = y / parseInt(year.id[0])
            if (svg.getAttribute('side') == 'left'){
                xCoord = x + 10
                width = svg.getAttribute('width') - x - 10
                yCoord = y - (vhLength / 2.2)
                height = vhLength * 0.9
            }else if (svg.getAttribute('side') == 'right'){
                xCoord = 0
                width = x - 10
                yCoord = y - (vhLength / 2.2)
                height = vhLength * 0.9
            }else{
                if (parseInt(id[0]) % 2 == 1){
                    xCoord = x + 10
                    width = svg.getAttribute('width') - x - 10
                }else{
                    xCoord = 0
                    width = x - 10
                }
                yCoord = y - (vhLength / 2.2)
                height = vhLength
            }
        }else{
            x = parseInt(bar.getAttribute('x2'))
            y = parseInt(bar.getAttribute('y2'))
            vhLength = x / parseInt(year.id[0])
            if (svg.getAttribute('side') == 'up'){
                xCoord = x - (vhLength / 2.5)
                width = vhLength - 10
                yCoord = y + 10
                height = svg.getAttribute('height') - y - 10
            }else if (svg.getAttribute('side') == 'down'){
                xCoord = x - (vhLength / 2.5)
                width = vhLength - 10
                yCoord = 0
                height = y - 10
            }else{
                if (parseInt(id[0]) % 2 == 1){
                    yCoord = y + 10
                    height = svg.getAttribute('height') - y - 10
                }else{
                    yCoord = 0
                    height = y - 10
                }
                xCoord = x - (vhLength)
                width = vhLength * 1.5
            }
        }
        const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", 'foreignObject')
        const title = document.createElementNS("http://www.w3.org/1999/xhtml",'h2')
        title.setAttribute('class', 'popUpBoxName')
        title.setAttribute('style', 'color:#A52A2A;')
        title.textContent = name
        const body = document.createElementNS("http://www.w3.org/1999/xhtml",'div')
        body.setAttribute('class', 'popUpBoxBody')
        body.textContent = text

        foreignObject.setAttribute("id", `${uid}${id}Description`)
        foreignObject.setAttribute("x", xCoord)
        foreignObject.setAttribute("y", yCoord)
        foreignObject.setAttribute("width", width)
        foreignObject.setAttribute("height", height)
        foreignObject.appendChild(title)
        foreignObject.appendChild(body)
        svg.appendChild(foreignObject)
    }

    //only support vertical
    this.scroll = function (numSteps, idList){
        //add smoothing effect on html
        const html = document.querySelector('html')
        html.setAttribute('style', 'scroll-behavior: smooth;')

        let spaceBetweenCircle;
        spaceBetweenCircle = (this.endCircleCoord - this.startCicleCoord) / (numSteps + 1)
        let x;
        if (this.side == 'left'){
            x = 60
        }else if (this.side == 'right'){
            x = this.width - 60
        }else{
            x = this.width / 2
        }

        for (let i = 0; i < numSteps; i++){
            const stepCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
            const aScroll = document.createElementNS("http://www.w3.org/2000/svg", 'a')
            aScroll.setAttribute("href", idList[i])

            stepCircle.setAttribute('cx', x)
            stepCircle.setAttribute('cy', spaceBetweenCircle * (i+1))
            stepCircle.setAttribute('r', 5)
            stepCircle.setAttribute("style","fill:white;stroke:black; stroke-width:2px")
            stepCircle.setAttribute('id', `${i+1}pageCircle`)
            stepCircle.addEventListener('click', function(){
                if (stepCircle.style.fill == "white"){
                    stepCircle.setAttribute('style',"fill:blue;stroke:black; stroke-width:2px")
                    for (let j = 0; j < numSteps; j++){
                        if (j !== i){
                            const findCircle = document.getElementById(`${j+1}pageCircle`)
                            findCircle.setAttribute('style', "fill:white;stroke:black; stroke-width:2px")
                        }
                    }
                }
            })
            aScroll.appendChild(stepCircle)
            this.svg.appendChild(aScroll)

        }

    }

    this.addStepEvents = function(numSteps, htmlList){
        let spaceBetweenCircle;
        spaceBetweenCircle = (this.endCircleCoord - this.startCicleCoord) / (numSteps + 1)
        let x, y;
        let boxX, boxY, boxWidth, boxHeight;
        if (this.direction == 'vertical'){
            if (this.side == 'left'){
                x = 60
                boxX = x + 10
                boxWidth = this.width - boxX
            }else if (this.side == 'right'){
                x = this.width - 60
                boxX = 0
                boxWidth = x - 10
            }else{
                throw new Error("does not support both side")
            }
            boxHeight = this.endCircleCoord - this.startCicleCoord
            boxY = this.startCicleCoord
        }else{
            if (this.side == 'up'){
                y = 40
                boxY = y + 10
                boxHeight = this.height - boxY
            }else if (this.side == 'down'){
                y = this.height - 60
                boxY = 0
                boxHeight = y - 10
            }else{
                throw new Error("does not support both side")
            }
            boxWidth = this.endCircleCoord - this.startCicleCoord
            boxX = this.startCicleCoord
        }

        //get the uid from parent node, so wont interfere with other svg using this function
        const uid = this.svg.getAttribute("class").slice(0,-3)

        const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", 'foreignObject')
        foreignObject.setAttribute("x", boxX)
        foreignObject.setAttribute("y", boxY)
        foreignObject.setAttribute("width", boxWidth)
        foreignObject.setAttribute("height", boxHeight)
        foreignObject.setAttribute('id', `${uid}stepBox`)
        

        for (let i = 0; i < numSteps; i++){
            if (this.direction == 'vertical'){
                y = spaceBetweenCircle * (i+1);
            }else{
                x = spaceBetweenCircle * (i+1)
            }

            
            const stepCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
            stepCircle.setAttribute('cx', x)
            stepCircle.setAttribute('cy', y)
            stepCircle.setAttribute('r', 5)
            stepCircle.setAttribute("style","fill:white;stroke:black; stroke-width:2px")
            stepCircle.setAttribute('id', `${uid}${i+1}stepCircle`)
            stepCircle.addEventListener('click', function(e){
                //handle which box id to show up
                const circle = e.target
                //get the uid from parent node, so wont interfere with other svg using this function
                const uid = circle.parentNode.getAttribute("class").slice(0,-3)
                //find the corresponding foreign object
                const obj = document.getElementById(`${uid}stepBox`)
                while (obj.firstChild) {
                    obj.removeChild(obj.firstChild);
                }
                if (typeof htmlList[i] == 'string'){
                    obj.insertAdjacentHTML('beforeend',htmlList[i]);
                }else{
                    obj.appendChild(htmlList[i])
                }

                //handle change color in the bar
                if (circle.style.fill == "white"){
                    circle.setAttribute('style',"fill:blue;stroke:black; stroke-width:2px")
                    for (let j = 0; j < numSteps; j++){
                        if (j !== i){
                            const findCircle = document.getElementById(`${uid}${j+1}stepCircle`)
                            findCircle.setAttribute('style', "fill:white;stroke:black; stroke-width:2px")
                        }
                    }
                }
            })
            this.svg.appendChild(stepCircle)
        }
        this.svg.appendChild(foreignObject)
        
    }

    return this
}