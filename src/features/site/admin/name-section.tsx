

interface NameSectionProps {
  name_section: string;
  description?: string;
}

export const NameSection = ({ name_section, description } : NameSectionProps) => {
  return(
    <section className="flex flex-col my-2.5 px-6 gap-1">
      <h1 className="text-white font[600] text-xl ">{name_section}</h1>
      <p className="text-white text-sm">{description}</p>
    </section>
  )
}