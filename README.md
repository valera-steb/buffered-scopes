# buffered-scopes

## зарисовка идеи

Нужно нечто вводящее линии разделения между разными областями. Как линия задержки 
в автомате, которая удерживает управляющее воздействие, устраняет гонку сигналов в цепи.


Т.е. получаетсья сценарий:

 + внешний источник либо код другой области, делает в ходе своей работы несколько вызовов данной области
 + по завершению обработчика внешнего либо наступлению события запускаеться цикл внутренней обработки
 + в цикле - происходит некое наложение прилетевщего воздействия
 + запускаеться внутренняя функция отработки
 
 
 
!! кстати, не могу уйти от control-convertion, где есть разбивка на этапы

 + формирование вектора управляющего воздействия
 + применение вектора управляющего воздействия
 
 
К тому-же хотелось бы получить единообразность как для внешних так и для внутренних проявлений.

Т.е. часть, не являющаяся областью внутри области должна вести себя как область.
Другими словами внутри области обращение к части которая не являеться областью должно быть
как будто обращаемся к единой внешней области.


И тут-же всплывает вопрос приоритетности областей. Если данная обратилась сразу к нескольким и в них 
изменения передать надо.