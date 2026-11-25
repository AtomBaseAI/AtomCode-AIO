#include <bits/stdc++.h>
using namespace std;

int max_jobs(std::vector<std::pair<int,int>> jobs) {
    std::sort(jobs.begin(), jobs.end(),
              [](const std::pair<int,int>& a, const std::pair<int,int>& b) {
                  return a.second < b.second;
              });
    int time = 0, done = 0;
    for (const auto& job : jobs)
        if (time + job.first <= job.second) {
            time += job.first;
            done++;
        }
    return done;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> jobs(n);
    for (auto& p : jobs) cin >> p.first >> p.second;
    cout << max_jobs(jobs) << "\n";
    return 0;
}
