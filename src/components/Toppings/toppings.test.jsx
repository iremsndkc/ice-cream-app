import { render, screen } from "@testing-library/react";
import Toppings from "./index";
import userEvent from "@testing-library/user-event";

test("sosları ekleme ve çıkarma işlemlerinin toplam fiyata etkisi", async () => {
    const user = userEvent.setup();
    // bileşeni renderle.
    render (<Toppings/>);

    // toplam spanı al.
    const total = screen.getByTestId("total");

    // tüm sosları al.
    const cards = await screen.findAllByTestId("card");

    // başlangıç anında toplam 0 mı?
    expect(total).toHaveTextContent(/^0$/);

    // bir sosa tıkla.
    await user.click(cards[5]);

    // toplam 5 oldu mu kontrol et.
    expect(total).toHaveTextContent(/^5$/);

    // farklı bir sosa tıkla.
    await user.click(cards[3]);

    // toplam 10 oldu mu kontrol et.
    expect(total).toHaveTextContent(/^10$/);

    // tıklanan soslardan birine tekrar tıkla.
    await user.click(cards[3]);

    // toplam 5 oldu mu kontrol et.
    expect(total).toHaveTextContent(/^5$/);

    // tıklanan soslardan diğerine tekrar tıkla.
    await user.click(cards[5]);

    // toplam 0 oldu mu kontrol et.
    expect(total).toHaveTextContent(/^0$/);

})

test("soslar sepete eklendiği zaman active class'ı alır", async () => {
    const user = userEvent.setup();

    // bileşeni renderla
    render(<Toppings/>);

    // bütün kartları al
    const cards = await screen.findAllByTestId("card");

    // bütün kartların active classına sahip olup olmadığından emin ol.
    cards.forEach((card) => expect(card).not.toHaveClass("active"));

    //expect(cards[0]).not.toHaveClass("active");
    //expect(cards[1]).not.toHaveClass("active");
    //expect(cards[2]).not.toHaveClass("active");
    //expect(cards[3]).not.toHaveClass("active");
    //expect(cards[4]).not.toHaveClass("active");
    //expect(cards[5]).not.toHaveClass("active");
    //expect(cards[6]).not.toHaveClass("active");

    // m&m kartına tıkla.
    await user.click(cards[0]);

    // m&m kartı active classına sahip mi?
    expect(cards[0]).toHaveClass("active");

    // m&m kartına tekrar tıkla.
    await user.click(cards[0]);

    // m&m kartı active classına sahip değil mi?
    expect(cards[0]).not.toHaveClass("active");

})