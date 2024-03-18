const scoreData = [
  {
    team: "team0",
    score: 90,
  },
  {
    team: "team1",
    score: 80,
  },
  {
    team: "team2",
    score: 20,
  },
  {
    team: "team3",
    score: 100,
  },
  {
    team: "team4",
    score: 110,
  },
]

function Leaderboard() {
  return (
    <>
      <div className="flex w-full justify-center font-mono text-[1.5rem]">
        <table className="border border-collapse">
          <thead className="">
            <tr className="font-bold">
              <th className="border py-3 px-5">Rank</th>
              <th className="border py-3 px-14">Team</th>
              <th className="border py-3 px-14">Score</th>
            </tr>
          </thead>
          <tbody className="">
            {scoreData.sort((a, b) => b.score - a.score).map((data, idx) => (
              <tr key={idx} className="">
                <td className="border text-center">{idx + 1}</td>
                <td className="border text-center">{data.team}</td>
                <td className="border text-center">{data.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Leaderboard;