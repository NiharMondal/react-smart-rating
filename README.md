# ⭐ React Smart Rating

A **modern**, **fractional**, and **customizable** rating component for React.  
Built with **TypeScript** + **Lucide Icons**, fully supports **half or decimal ratings** and **custom icons**.

---

## 🧩 Installation

```bash
  npm install react-smart-rating
```

## 🚀 Usage Example

```
  import { ReactSmartRating } from "react-smart-rating";
  import { Heart } from "lucide-react";

  export default function Example() {
    return (
      <div>
        {/* Default */}
        <ReactSmartRating initialRating={3.5} onChange={(v) => console.log(v)} />

        {/* Half-precision */}
        <ReactSmartRating precision={0.5} />

        {/* Custom icon */}
        <ReactSmartRating icon={Heart} activeColor="red" precision={0.5} />

        {/* Read only */}
        <ReactSmartRating initialRating={4.8} readOnly />
      </div>
    );
  }

```

## ⚙️ Props

| Prop            | Type                     | Default   | Description                       |
| --------------- | ------------------------ | --------- | --------------------------------- |
| `totalStars`    | number                   | 5         | Number of icons                   |
| `initialRating` | number                   | 0         | Can be fractional (e.g. 3.5)      |
| `readOnly`      | boolean                  | false     | Disables user interaction         |
| `onChange`      | (rating: number) => void | —         | Called when rating changes        |
| `icon`          | React.ElementType        | `Star`    | Custom icon component             |
| `activeColor`   | string                   | `#facc15` | Color for filled icons            |
| `inactiveColor` | string                   | `#d1d5db` | Color for empty icons             |
| `size`          | number                   | 24        | Icon size in pixels               |
| `precision`     | number                   | 0.5       | Step size for fractional rounding |
