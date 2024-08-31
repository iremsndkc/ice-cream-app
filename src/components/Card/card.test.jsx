import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";


// prop olarak gönderilecek item.
const item = {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
    id: "c8c7",
};


// prop olarak gönderilecek basket
const basket = [
    {
        name: "Chocolate",
        imagePath: "/images/chocolate.png",
        id: "c8c7",
        amount: 3,
    },
    {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
        id: "fdad",
        amount: 1,
    },
];

// çikolatasız sepet
const otherBasket = [
    {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
        id: "fdad",
        amount: 1,
    },

]


// Prop olarak veri alan bir bileşeni test ediyorsak bileşenin
// aldığı propları test ortamında gödermemiz gerekli.
test("miktar, başlık, fotoğraf gelen propa göre ekrana basılır." , () => {
    render(<Card 
        item={item}
        addToBasket={() => {}}
        removeFromBasket={() => {}}
        basket={basket}
    />);


    // miktar spanını çağır.
    const amount = screen.getByTestId("amount");

    // span içeriği 3 mü kontrol et.
    expect(amount).toHaveTextContent(/^3$/);

    // chocolate yazısı ekrana geldi mi kontrol et.
    // getBy elementi bulamazsa hata fırlatır bu yüzden sadece "x"
    // yazı içeriğine sahip element ekranda mı kontrolü yaomak istiyorsak
    // getByText ile elementi çağırmak yeterlidir daha
    // sonrasında expect kullanmaya gerek yoktur.

    // 1. Yol
    //const name = screen.getByText("Chocolate");
    //expect(name).toBeInTheDocument();

    // 2. Yol
    screen.getByText("Chocolate");

    // resim elementini çağır.
    const img = screen.getByAltText("çeşit-resim");

    // resmin kaynağı doğru mu kontrol et.
    expect(img).toHaveAttribute("src", "/images/chocolate.png" );

});

// find => asenkron olarak ekrana basılan elemtleri almak için kullanılır. (ör:scoopstaki card gibi)
// get => asenkron yoksa api isteğinden sonra ekrana basılma yoksa get kullanılır.

test("butonlara tıklanınca fonksiyonlar doğru parametreler ile çalışır", async () => {
    const user = userEvent.setup();

    // mock => (izole etmek), dış bağımlılıkları izole eder.

    // prop olarak gönderilecek fonksiyonları test edeceksek jest aracılığı (mock) ile 
    // test edilebilir fonksiyonlar oluştur.
    const addMockFn = jest.fn();
    const removeMockFn = jest.fn();

    // test edilevcek bileşeni renderla
    render(<Card 
        item={item} 
        basket={basket} 
        addToBasket={addMockFn}
        removeFromBasket={removeMockFn}
    />);

    // butonları al.
    const addBtn = screen.getByRole("button", { name: /ekle/i });
    const delBtn = screen.getByRole("button", { name: /azalt/i });

    // ekle  butonuna tıkla.
    await user.click(addBtn);

    // addToBasket methodu doğru parametreler ile çalıştı mı?
    expect(addMockFn).toHaveBeenCalledWith(item);

    // azalt butonuna tıkla.
    await user.click(delBtn);

    // removeFromBasket methodu doğru parametreler ile çalışıyor mu?
    expect(removeMockFn).toHaveBeenCalledWith(item.id);
});


// describe aynı ilevin testlerini bir araya getirmek için
//kullandığımız bir nevi testleri kategorize etmemizi sağlayan method.
describe("azalt butonunun aktiflik testleri", () => {
it("sepette aynı item varsa buton aktiftir.", () => {
    render(<Card 
        item={item} 
        basket={basket}
    />);

    const button = screen.getByRole("button", { name: "Azalt" });
    expect(button).toBeEnabled();
});

it("sepette aynı item yoksa buton inaktiftir.", () => {
    render(<Card 
        item={item} 
        basket={otherBasket}
    />);

    const button = screen.getByRole("button", { name: "Azalt" });
    expect(button).toBeDisabled();
});
});