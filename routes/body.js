export const body = 
`<h2>Welcome to the quiz</h2>
<p>This is a quiz about me. It has just 10 questions.</p>
<h6 id="test">To start the quiz, click the button below</h6>
<p class="paper-btn" title="Start" id="start">Start</button>

<div style="display: none" id="show">
<form action="/score" method="post">
    <b>Instructions :</b>
    <p>1. Do Not Refresh the page</p>
    <p>2.Select only <b>1</b> box, selection of two or more will result in the loss of mark of the particular question.</p>
    <h2> Questions </h2>
    <ol>
        <label for="question1">Question 1. </label>        
        <b>Who am i ?</b>
        <ul>
            <li>
                <input type="checkbox" name="jimoh" class="q_1" />Abdul
                <input type="checkbox" name="abdul" class="q_2"/>Tawa
                <input type="checkbox" name="tawa" class="q_3" />Safu
                <input type="checkbox" name="safu" class="q_4" />Sule
            </li>
        </ul>

        <label for="Question2"> Question 2.
            <b>How old am i ?
                <ul>
                    <li>
                        <input type="checkbox" name="10" class="q_5">10
                        <input type="checkbox" name="20" class="q_6">20
                        <input type="checkbox" name="15" class="q_7">15
                        <input type="checkbox" name="19" class="q_8">19
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question3"> Question 3.
            <b>How many sisters do i have ?
                <ul>
                    <li>
                        <input type="checkbox" name="6" class="q_9">6
                        <input type="checkbox" name="8" class="q_10">8
                        <input type="checkbox" name="2" class="q_11">2
                        <input type="checkbox" name="3" class="q_12">3
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question4"> Question 4.
            <b>What's my hobby ?
                <ul>
                    <li>
                        <input type="checkbox" name="Eating" class="q_13">Eating
                        <input type="checkbox" name="Programming" class="q_14">Programming
                        <input type="checkbox" name="Sleeping" class="q_15">Sleeping
                        <input type="checkbox" name="Writing" class="q_16">Writing
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question5"> Question 5
            <b>What's my favorite text editor ?
                <ul>
                    <li>
                        <input type="checkbox" name="vscode" class="q_17">Visual Studio Code
                        <input type="checkbox" name="sublime" class="q_18">Sublime
                        <input type="checkbox" name="wordpad" class="q_19">Wordpad
                        <input type="checkbox" name="notepad" class="q_20">Notepad
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question6"> Question 6
            <b>What is my favorite programming language ?
                <ul>
                    <li>
                        <input type="checkbox" name="cpp" class="q_21">C++
                        <input type="checkbox" name="c#" class="q_22">C#
                        <input type="checkbox" name="php" class="q_23">Php
                        <input type="checkbox" name="javascript" class="q_23">JavaScript
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question7"> Question 7
            <b>What was the first Unique programming language i learnt ?
                <ul>
                    <li>
                        <input type="checkbox" name="java" class="q_25">Java
                        <input type="checkbox" name="c++" class="q_26">C++
                        <input type="checkbox" name="ruby" class="q_27">Ruby
                        <input type="checkbox" name="python" class="q_28">Python
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question8"> Question 8
            <b>What is my favorite framework ?
                <ul>
                    <li>
                        <input type="checkbox" name="express" class="q_29">ExpressJS
                        <input type="checkbox" name="none" class="q_30">None
                        <input type="checkbox" name="nodeJs" class="q_31">NodeJs
                        <input type="checkbox" name="lang" class="q_32">Lang
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question9"> Question 9
            <b>I am a _______ guy .
                <ul>
                    <li>
                        <input type="checkbox" name="cool" class="q_33">Cool
                        <input type="checkbox" name="gentle" class="q_34">Gentle
                        <input type="checkbox" name="stubborn" class="q_35">Stubborn
                        <input type="checkbox" name="problematic" class="q_36">Problematic
                    </li>
                </ul>
            </b>
        </label>
        <label for="Question10"> Question 10
            <b>Rate my app over 10.
                <ul>
                    <li>
                        <input type="checkbox" name="1" class="q_37">1
                        <input type="checkbox" name="5" class="q_38">5
                        <input type="checkbox" name="9" class="q_39">9
                        <input type="checkbox" name="10" class="q_40">10
                    </li>
                </ul>
            </b>
        </label>
    </ol>
    <button type="submit">Submit</button>
    </form>
</div>`;

const content = document.getElementById('content').outerHTML = body;

module.exports = content;