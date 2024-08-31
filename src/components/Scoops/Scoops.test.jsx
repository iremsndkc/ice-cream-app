import { fireEvent, render, screen }  from "@testing-library/react";
import Scoops from "./index";
import userEvent from "@testing-library/user-event";

/*
! Seçiciler
1) Method tipi | 2) All İfadesi | 3) Seçici Method

* get > render anında dom'da olan elementleri almak için kullanılır.
* | elementi bulamazsa hata verir.
------------------------------------------------------------------------------
* query > elementin ekranda olma durumunu kesin değilse kullanılır.
* get ile benzer çalışır. | elementi bulamazsa null döndürür test devam eder.
------------------------------------------------------------------------------
* find > elementin ekrana basılmasının asenkron olduğu durumlarda kullanılır.
* (api isteği sonucu ekrana basılacaksa.)
* not: find methodu promise döndürdüğü için asyn await ile kullanılmalı.
------------------------------------------------------------------------------
* eğer seçici methoda all ifadesi eklersek seçici koşula uyan bütün elemanlarını getirir.
------------------------------------------------------------------------------
* not: all kullanılırsa dönen cevapta 1 eleman olsa dahi dizi döner.

*/

test("API' den alınan veriler için kartlar eksana basılır.", async () => {
    // test edilecek bileşen render edilir.
    render(<Scoops/>);

    // ekrana basılan kartları al (resimleri almak yeterli)
    const images = await screen.findAllByAltText("çeşit-resim");

    // ekrandaki resimlerin (kartların) sayısı 1'den fazla mı?
    expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin ekleme ve azaltma işlevlerinin toplam fiyata etkisi" , async () => {
    // userEvent'in kurulumunu yap.
    const user = userEvent.setup();

    // test edilecek bileşen render edilir.
    render(<Scoops/>);

    // bütün ekleme ve azaltma butonlarını çağır.
    const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
    const delBtns = await screen.findAllByRole("button", { name: "Azalt" });

    // toplam fiyat elementini çağır.
    const total = screen.getByTestId("total");

    // başlangıç anında toplam 0 mı konrol et.
    expect(total).toHaveTextContent(/^0$/);

    // chocalete'nin ekle butonuna tıkla.
    //fireEvent.click(addBtns[2]);
    await user.click(addBtns[2]);

    // toplam fiyat 20 mi kontrol et.
    expect(total).toHaveTextContent(/^20$/);

    // vanilla'nın ekle butonuna çift tıkla.
    await user.dblClick(addBtns[1]);

    // toplam fiyat 60 mı kontrol et.
    expect(total).toHaveTextContent(/^60$/);

    // vanilla'nın azalt butonuna bir kez tıkla.
    await user.click(delBtns[1]);

    // toplam fiyat 40 mı kontrol et.
    expect(total).toHaveTextContent(/^40$/);

    // vanilla'nın azalt butonuna bir kez tıkla.
    await user.click(delBtns[1]);

    // toplam fiyat 20 mi kontrol et.
    expect(total).toHaveTextContent(/^20$/);

    // chocolate'nin azalt butonuna bir kez tıkla.
    await user.click(delBtns[2]);

    // toplam fiyat 0 mı kontrol et.
    expect(total).toHaveTextContent(/^0$/);
})