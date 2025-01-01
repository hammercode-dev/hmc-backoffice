import { formatMoney } from "@/utils/money";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold text-3xl">Golang + Flutter Workshop</h1>
      <p>ID: #{params.id}</p>
      <p>Link: https://dev.hammercode.org/events/golang-flutter-workshop</p>
      <p>Waktu: 3-4 Jan 2025</p>
      <p>Workshop | Offline</p>
      <p>Harga: Rp. 25.000,00</p>
      <p>Pemasukkan: Rp. {formatMoney(20 * 25_000)}</p>
      <img src="https://picsum.photos/536/354" />

      <h2 className="mt-8">Deskripsi</h2>
      <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nostrum tempore distinctio qui, eaque voluptas unde iure velit reiciendis sequi laborum. Molestias similique nam nesciunt suscipit illo architecto. Cum, quasi.</div>

      <h2>Peserta</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Payment Ref</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr key={idx}>
              <td>John Doe</td>
              <td>johndoe@gmail.com</td>
              <td>n/a</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
