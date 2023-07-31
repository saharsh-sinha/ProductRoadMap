import Image from 'next/image'
import Roadmap from './roadmap'
import TimeLine from './timeline'
import TitleBar from './titlebar'

export default function Home() {
  return (
    <main className="d-flex flex-column justify-content-start h-100 bg-dark text-white">
      <div>
        <TitleBar></TitleBar>
      </div>
      <div className="overflow-hidden d-flex flex-column h-100 fit-content">
        <div>
          <TimeLine></TimeLine>
        </div>
        <div className="h-100">
          <Roadmap></Roadmap>
        </div>
      </div>
    </main>
  )
}
