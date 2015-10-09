/**
 * Created by steb on 10.10.15.
 */
define(['c/Observable'], function (Observable) {
    describe('Computed/Computed', function () {
        xit('при созданни должен получать и запоминать список использованных в нём observable/computed');

        describe('должен пересчитывать своё значение по', function () {
            xit('изменению дочернего observable');

            xit('изменению дочернего computed');
        });

        xit('должен отписываться от прослушиваемых элементов по уничтожению');

        describe('должен оповещать домен', function () {
            xit('при создании +init +calculation -calculation -init');

            xit('при изменении +calculation +setValue -setValue -calculation')
        });
    });
});
