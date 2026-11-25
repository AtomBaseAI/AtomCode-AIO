#include <bits/stdc++.h>
using namespace std;

int min_platforms(std::vector<std::pair<int,int>> trains) {
    int n = (int)trains.size();
    std::vector<int> arr(n), dep(n);
    for (int i = 0; i < n; i++) {
        arr[i] = trains[i].first;
        dep[i] = trains[i].second;
    }
    std::sort(arr.begin(), arr.end());
    std::sort(dep.begin(), dep.end());
    int plat = 0, best = 0, i = 0, j = 0;
    while (i < n && j < n) {
        if (arr[i] < dep[j]) {
            plat++;
            if (plat > best) best = plat;
            i++;
        } else {
            plat--;
            j++;
        }
    }
    return best;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> trains(n);
    for (auto& p : trains) cin >> p.first >> p.second;
    cout << min_platforms(trains) << "\n";
    return 0;
}
