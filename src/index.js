import _ from "lodash";
import axios from "axios";
import "./style.css";
import Icon from "../assets/larry.png";
import Applicant from "./applicants";

// ============= WEBPACK STUFF =============
function component() {
    var element = document.createElement("div");

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    element.classList.add("hello");

    var icon = new Image();
    icon.src = Icon;

    element.appendChild(icon);

    return element;
}

document.body.appendChild(component());

// ============= MY STUFF =============
axios.get("http://localhost:3000/db"/*'http://sparkware.training.emotionconcept.ro/dataset.json'*/)
    .then((response) => {
        //console.log(response);
        let applicants = [];
        for(let applicantInfo of response.data.data) {
            applicants.push(new Applicant(applicantInfo));
            //console.log(applicants[applicants.length - 1].proxy.CandidateName);
            //console.log(applicants[applicants.length - 1].getFullDetails());
        }
        //console.log(applicants);
        let filter = filterData(applicants);
        console.log(filter.CandidateName.ContactPhone());
    });

let filterData = data => {
    let parts = [];
    let proxy = new Proxy(() => {
        let returnValue = [];
        for(let candidate of data) {
            let candidateObj = {};
            for(let part of parts) {
                if(candidate.proxy[part]) {
                    candidateObj[part] = candidate.proxy[part];
                }
            }
            returnValue.push(candidateObj);
        }
        parts = [];
        return returnValue;
    },
    {
        has: () => {
            return true;
        },
        get: (object, prop) => {
            parts.push(prop);
            return proxy;
        }
    });
    return proxy;
}
/*
  zookeeper -> server de configuratii scalabil, bun pt configuratii si abtests and all kinds of shit

  distributed systems tanenbaum
*/
